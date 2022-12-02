import Button from "@mui/material/Button";
export const SubmitButton = ({ text }) => {
  return (
    <div className="flex justify-center mt-2">
      <Button className="w-40 !pt-3 !pb-3" type="submit" variant="contained">
        {text}
      </Button>
    </div>
  );
};
