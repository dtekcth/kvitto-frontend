import { useEffect, useState } from 'react'
import { Committee, getCommittes } from '../../api/committes'
//import { Split } from './AdminStyles'

export const Committees = (): JSX.Element => {
  const [committees, setCommittees] = useState<Committee[]>([])

  useEffect(() => {
    void getCommitteesLocal()
  }, [])

  const getCommitteesLocal = (): void => {
    void getCommittes().then(result => {
      if (!(result instanceof Error)) {
        const temp: Committee[] = []
        result.forEach((value: Committee) => {
          temp.push(value)
        })
        setCommittees(result)
      }
    })
  }

  const showCommittees = []
  for (let index = 0; index <= committees.length; index++) {
    if (committees[index] != null) {
      showCommittees.push(
        <tr key={committees[index].id}>
          <td>{committees[index].name}</td>
          <td>{committees[index].vismaId}</td>
          <td>{committees[index].active.toString()}</td>
          <td>
            <button>Open</button>
          </td>
        </tr>,
      )
    }
  }

  return (
    <div>
      <div className="split-left">
        <div className="centered">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                Showing all Committees
              </div>
              <div className="table-div">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Visma Id</th>
                      <th>Active</th>
                      <th>Modal</th>
                    </tr>
                  </thead>
                  <tbody>{showCommittees}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Showing all Committees
          </div>
          <div className="table-div">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Visma Id</th>
                  <th>Active</th>
                  <th>Modal</th>
                </tr>
              </thead>
              <tbody>{showCommittees}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
