import { IoPersonCircleSharp } from 'react-icons/io5';

const PersonIcon = () => {
  return (
    <div style={{fontSize: '2.5rem'}}>
      <IoPersonCircleSharp />
    </div>
  );
};

export default function ProfileButton() {
  return (
    <>
      <PersonIcon />
    </>
  );
}
