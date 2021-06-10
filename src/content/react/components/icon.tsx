import { removeIconUrl } from '@/content/lib/notion';
import styled from '@emotion/styled';

interface IconProps extends React.ImgHTMLAttributes<HTMLImageElement>{
  size?:number
}

export const Img = styled.img<{size?:number}>(({size=12})=>`
  width: ${`${size}px`};
`)

const App:React.FC<IconProps> = props => {
  const handleError = (src?:string) => {
    if(src){
      props.src && removeIconUrl(src);
    }
  }
  return <Img onError={() =>handleError(props.src)} {...props}/>;
}

export default App;