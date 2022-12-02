export const PageHeader = ({ text }) => {
  //   console.log(props.props);
  console.log(text);
  return (
    <div className="w-full flex justify-center mt-10">
      <h1 className="text-5xl">{text}</h1>
    </div>
  );
};
