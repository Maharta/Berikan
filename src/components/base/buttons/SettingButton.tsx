interface SettingButtonProps {
  label: string;
  icon: JSX.Element;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const SettingButton = ({ label, icon, onClick }: SettingButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="mt-2 flex cursor-pointer items-center gap-3">
      {icon}
      {label}
    </button>
  );
};

export default SettingButton;
