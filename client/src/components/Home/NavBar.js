import '../../index.css';


export default function NavBar() {
    return (
      <nav className="flex flex-row items-center justify-center p-4">
        <ul className="flex justify-between gap-y-4 space-x-4">
          <li> <a href='/'>Home</a> </li>
          <li> <a href='/'>Upload</a> </li>
          <li> <a href='/'>View</a> </li>
        </ul>
      </nav>
    );
  }