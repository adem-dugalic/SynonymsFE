import * as React from "react";
import { DeleteButton } from "./DeleteButton";
import { PageHeader } from "./PageHeader";
import { SubmitButton } from "./SubmitButton";
import { SynonymList } from "./SynonymList";
import { SynonymTextField } from "./SynonymTextField";
import Toast from "./Toast";

export const Layout = () => {
  const [synonyms, setSynonyms] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("success");
  const [key, setKey] = React.useState("");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  //This submit function is for search of synonyms
  const onSearching = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "GET",
      headers: { "content-type": "application/json" },
    };
    if (e.target.synonym.value) {
      try {
        console.log(e.target.synonym.value);
        const res = await fetch(
          `http://localhost:8000/api/synonyms/${e.target.synonym.value}`,
          requestOptions
        );
        const jsonRes = await res.json();
        if (res.status !== 200) {
          setSeverity("warning");
          setMessage("Please insert a valid word!");
          handleClick();
        } else {
          setKey(e.target.synonym.value);
          setSynonyms(jsonRes);
        }
      } catch (error) {
        setSeverity("error");
        setMessage(error.message);
        handleClick();
      }
    }
  };
  //This submit function is for creation of synonyms
  const onSubmitting = async (e) => {
    console.log("==");
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        word: e.target.word.value,
        synonym: e.target.synonym.value,
      }),
    };
    try {
      const res = await fetch(
        "http://localhost:8000/api/synonyms",
        requestOptions
      );
      const jsonRes = await res.json();
      if (res.status === 201 || res.status === 204) {
        setSeverity("success");
        setMessage(jsonRes.message);
        handleClick();
      } else {
        setSeverity("warning");
        setMessage(jsonRes.message);
        handleClick();
      }
    } catch (error) {
      setSeverity("error");
      setMessage(error.message);
      handleClick();
    }
  };
  return (
    <div className="w-full grid grid-rows-4 ">
      <PageHeader text={"Synonym App"} />
      <div className="w-full flex justify-center">
        <form
          className="pt-10 grid grid-rows-3  w-7/12 justify-center"
          onSubmit={onSubmitting}
        >
          <div className="flex justify-center">
            <h6 className="text-2xl">Add synonyms</h6>
          </div>
          <div className="flex esm:space-x-8 max-[600px]:flex-col">
            <SynonymTextField name="word" label="Word" variant="filled" />
            <SynonymTextField name="synonym" label="Synonym" variant="filled" />
          </div>
          <div className="w-full">
            <SubmitButton text="ADD" />
          </div>
        </form>
      </div>
      <div className="w-full flex justify-center mt-5">
        <form
          className="pt-10 grid grid-rows-3 w-7/12 justify-center"
          onSubmit={onSearching}
        >
          <div className="flex justify-center">
            <h6 className="text-2xl">Search synonyms</h6>
          </div>
          <div className="space-x-8">
            <SynonymTextField name="synonym" label="Word" variant="filled" />
          </div>
          <div className="w-full">
            <SubmitButton text={"SEARCH"} />
          </div>
        </form>
      </div>
      <div className="w-full flex justify-center mt-5">
        <SynonymList synonyms={synonyms} synonymKey={key} />
      </div>
      <Toast
        handleClick={handleClick}
        handleClose={handleClose}
        open={open}
        message={message}
        severity={severity}
      />
      <DeleteButton
        setMessage={setMessage}
        setSeverity={setSeverity}
        handleClick={handleClick}
      />
    </div>
  );
};
