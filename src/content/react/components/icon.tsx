import { removeIconUrl } from '@/api/notion/icon'
const App:React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = props => {
  const handleError = () => {
    props.src && removeIconUrl(props.src)
  }
  return <img onError={handleError} {...props}/>;
}

export default App;