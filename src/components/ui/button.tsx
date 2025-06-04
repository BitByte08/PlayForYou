import { ButtonProps } from "@/interface"

export const ColorButton = (props: ButtonProps) => {
  return (
    <button
      onClick={props.function}
      className="w-full bg-blue-500 text-white rounded py-2 mb-4 hover:bg-blue-600 transition"
    >
      {props.children}
    </button>
  )
}