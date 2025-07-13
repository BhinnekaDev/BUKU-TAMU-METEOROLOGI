import { IconBmkgProps } from "@/interfaces/IconBmkgProps";

export default function IconBmkg({ logo, text }: IconBmkgProps) {
  return (
    <div className="flex items-center p-3 gap-2">
      <img src={logo} alt="logo" className=" w-[47px] h-[42px]" />
      <p
        className="text-sm mb-1 font-medium"
        style={{ textShadow: "1px 1px 1px rgba(0, 0, 0, 0.2)" }}
      >
        {text}
      </p>
    </div>
  );
}
