import Button from "@mui/material/Button";
export const DeleteButton = ({ setSeverity, setMessage, handleClick }) => {
  const onDelete = async () => {
    const requestOptions = {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    };
    try {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL,
        requestOptions
      );
      if (res.status === 200) {
        setSeverity("success");
        setMessage("Deleted");
        handleClick();
      }
      window.location.reload();
    } catch (error) {
      setSeverity("error");
      setMessage(error.message);
      handleClick();
    }
  };
  return (
    <div className="w-full flex justify-center relative bottom-1">
      <Button
        className="mr-5"
        variant="contained"
        color="error"
        onClick={() => onDelete()}
      >
        Delete All Synonyms
      </Button>
    </div>
  );
};
