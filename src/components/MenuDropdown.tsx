import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export interface MenuOption {
  action: React.MouseEventHandler<HTMLElement>
  label: string
}

interface Props {
  options: MenuOption[]
}

export const MenuDropdown = ({ options }: Props): JSX.Element => {
  if (options != null) {
    return (
      <DropdownButton
        id="dropdown-item-button"
        title={<FontAwesomeIcon icon={faBars}></FontAwesomeIcon>}
      >
        {options.map(option => {
          return (
            <Dropdown.Item key={option.label} onClick={option.action}>
              {option.label}
            </Dropdown.Item>
          )
        })}
      </DropdownButton>
    )
  }

  return <></>
}
