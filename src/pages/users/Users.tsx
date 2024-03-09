import { getAllUsers, getRoles } from '../../api/users'
import { DropdownOption } from '../../components/dropdown/Dropdown'
import { useEffect, useState } from 'react'
import { UserTable } from './UserTable'
import { AddUserModal } from './AddUserModal'
import { DeleteUserModal } from './DeleteUserModal'

export interface User {
  google_id: string
  id: number
  email: string
  role_id: number
  pending: boolean
}

export interface Roles {
  role_name: string
  role_id: number
  perm_level: number
}

export type RolesMap = {
  [id: number]: string
}

export const Users = (): JSX.Element => {
  const [users, setUsers] = useState<User[]>([])
  const [roles, setRoles] = useState<RolesMap>({})
  const [roleOptions, setRoleOptions] = useState<DropdownOption[]>([])
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false)
  const [deleteUser, setDeleteUser] = useState<User | null>(null)

  useEffect(() => {
    getRoles().then((result): void => {
      if (result instanceof Error) {
      } else {
        const rolesMap: RolesMap = {}
        const roles = result.data.roles as Roles[]
        const tempRoleOptions: DropdownOption[] = []
        roles.map((role): void => {
          rolesMap[role.role_id] = role.role_name.toUpperCase();
          tempRoleOptions.push({value: role.role_id, label: role.role_name.toUpperCase()});
        })
        setRoleOptions(tempRoleOptions)
        setRoles(rolesMap)
      }
    })

    getAllUsers().then((result): void => {
      if (result instanceof Error) {
      } else {
        setUsers(result.data.users)
      }
    })
  }, [])

  const deleteUserCallback = (user: User): void => {
    setDeleteUser(user)
    setShowDeleteUserModal(true)
  }

  const handleCloseAddUser = (): void => {
    setShowAddUserModal(false)
  }

  const handleCloseDeleteUser = (): void => {
    setShowDeleteUserModal(false)
  }

  const handleShowAddUser = (): void => {
    setShowAddUserModal(true)
  }

  return (
    <div>
      <button onClick={handleShowAddUser}>Add user</button>
      <UserTable 
        users={users} 
        roleOptions={roleOptions} 
        roles={roles} 
        deleteUser={deleteUserCallback}>
      </UserTable>

      <DeleteUserModal
        handleClose={handleCloseDeleteUser}
        show={showDeleteUserModal}
        user={deleteUser}>
      </DeleteUserModal>
      
      <AddUserModal 
        show={showAddUserModal} 
        handleClose={handleCloseAddUser} 
        roleOptions={roleOptions}>
      </AddUserModal>
    </div>
  )
}
