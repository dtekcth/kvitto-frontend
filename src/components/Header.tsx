import styling from './styling/header.module.css'
  
export const Header = (): JSX.Element => {
    
  return (
    <div className={styling.header}>
      <h1 className={styling.title}>Utlägg</h1>
      
      <button className={styling.adminbutton}>Admin</button>
    </div>
  )
}
