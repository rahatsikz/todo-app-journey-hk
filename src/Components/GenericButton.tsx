/* eslint-disable @typescript-eslint/no-explicit-any */
const GenericButton = ({ children }: any) => {
  return (
    <button className='btn btn-primary btn-wide text-lg !capitalize !py-1 '>
      {children}
    </button>
  );
};

export default GenericButton;
