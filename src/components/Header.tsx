import LogoSVG from './Datalogga.svg'
import { AdminButton, HeaderDiv, Logo, TitleH1 } from './HeaderStyles'

export const Header = (): JSX.Element => {
  return (
    <HeaderDiv>
      <TitleH1>
        <Logo src={LogoSVG}></Logo>
        <div>Utlägg</div>
      </TitleH1>
      <AdminButton className="btn btn-primary">Admin</AdminButton>
    </HeaderDiv>
  )
}
