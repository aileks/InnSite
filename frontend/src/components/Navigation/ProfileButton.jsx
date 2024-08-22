import { IoPersonCircleSharp } from 'react-icons/io5';

const PersonIcon = () => {
  return (
    <div style={{ fontSize: '2.2em', marginTop: '8px', cursor: 'pointer' }}>
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
