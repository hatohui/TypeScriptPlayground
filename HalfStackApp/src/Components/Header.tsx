interface HeaderProps {
  courseName: string;
}

const Header = (props: HeaderProps): JSX.Element => {
  return (
    <div className="header">
      <h1>{props.courseName}</h1>
    </div>
  );
};

export default Header;
