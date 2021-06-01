import { removeIconUrl } from '@/content/lib/notion';

const App:React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = props => {
  const handleError = (src?:string) => {
    if(src){
      props.src && removeIconUrl(src);
    }
  }
  return <img onError={() =>handleError(props.src)} {...props}/>;
}

export default App;