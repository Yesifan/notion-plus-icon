import { parseClassName } from "@/content/lib/utils";

const Loading:React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg viewBox="0 0 1024 1024" {...props}>
      <path d="M864 323.2c-9.6 0-22.4-6.4-25.6-16C764.8 195.2 643.2 128 512 128c-19.2 0-32-12.8-32-32s12.8-32 32-32c153.6 0 297.6 76.8 377.6 208 9.6 16 6.4 35.2-9.6 44.8-3.2 3.2-9.6 6.4-16 6.4z"></path>
    </svg>
  )
}

const App:React.FC<React.SVGProps<SVGSVGElement>> = ({className, ...props}) => {
  return (
    <Loading className={parseClassName("loading-spinner", className)} {...props}/>
  )
}

export default App