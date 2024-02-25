import Pagination from 'react-bootstrap/Pagination'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { getPaginatedPurchases, ReceivedPurchase } from '../api/purchases'
import { useEffect, useState } from 'react'
import { DropdownOption } from '../components/Dropdown'
import Select from 'react-select'
import { AdminModal } from './AdminModal'
import { Committee, getCommittes } from '../api/committes'
//import { Split } from './AdminStyles'

export const Admin = (): JSX.Element => {
  const items = []

  const [purchases, setPurchases] = useState<ReceivedPurchase[]>([])
  const [purchasesLength, setPurchasesLength] = useState<number>(0)
  const [purchasesPerPage, setPurchasesPerPage] = useState<number>(10)
  const [active, setActive] = useState<number>(1)
  const [committees, setCommittees] = useState<Committee[]>([])

  //AdminModal constants
  const initPurchase: ReceivedPurchase = {
    id: -1,
    committee: {
      id: -1,
      name: '',
      vismaId: -1,
      active: false,
    },
    budgetPost: {
      id: -1,
      name: '',
      vismaId: -1,
    },
    receiptPaths: [],
    description: '',
    paymentType: '',
    name: '',
    phoneNr: '',
    clearing: '',
    accountNumber: '',
    isHandled: false,
    isApproved: false,
    crowns: 0,
    ore: 0,
    purchaseDate: '',
    submitDate: '',
  }
  const [show, setShow] = useState(false)
  const [modalPurchase, setModalPurchase] =
    useState<ReceivedPurchase>(initPurchase)
  const handleClose = (): void => {
    setShow(false)
  }
  const handleShow = (purchase: ReceivedPurchase): void => {
    setModalPurchase(purchase)
    setShow(true)
  }
  const updatePurchase = (purchase: ReceivedPurchase): void => {
    setPurchases(
      purchases.map(p => {
        if (p.id === purchase.id) {
          return purchase
        }
        return p
      }),
    )
  }

  const numberOnClick = (number: number): void => {
    setActive(number)
    getPurchases(purchasesPerPage, number - 1)
    console.log(purchases)
  }

  const getPurchases = (pageSize: number, pageNumber: number): void => {
    void getPaginatedPurchases(pageSize, pageNumber).then(result => {
      if (!(result instanceof Error)) {
        const temp: ReceivedPurchase[] = []
        result.purchases.forEach((value: ReceivedPurchase) => {
          temp.push(value)
        })
        setPurchases(temp)
        setPurchasesLength(result.numberOfPurchases)
      }
    })
  }

  for (
    let number = 1;
    number <= Math.ceil(purchasesLength / purchasesPerPage);
    number++
  ) {
    items.push(
      <Pagination.Item
        key={number}
        onClick={(): void => numberOnClick(number)}
        active={number === active}
      >
        {number}
      </Pagination.Item>,
    )
  }


  useEffect(() => { 
    void getPurchases(purchasesPerPage, 0)
    void getCommitteesLocal()
  }, [])

  const shownPurchases = []
  for (let index = 0; index <= purchases.length; index++) {
    if (purchases[index] != null) {
      let oreStr: string = purchases[index].ore.toString()
      if (purchases[index].ore < 10) {
        oreStr = '0' + oreStr
      }
      shownPurchases.push(
        <tr key={purchases[index].id}>
          <td>{purchases[index].purchaseDate}</td>
          <td>{purchases[index].name}</td>
          <td>
            {purchases[index].crowns},{oreStr}
          </td>
          <td>
            <button onClick={() => handleShow(purchases[index])}>Open</button>
          </td>
        </tr>,
      )
    }
  }

  const getCommitteesLocal = (): void => {
     void getCommittes().then(result => {
      if(!(result instanceof Error)) {
        const temp: Committee[] = []
        result.forEach((value: Committee) => {
          temp.push(value)
      })
      setCommittees(result)
      }
    })
  } 

  const showCommittees = []
  for(let index = 0; index <= committees.length; index++){
    if (committees[index] != null){ 
    showCommittees.push(
      <tr key={committees[index].id}>
        <td>{committees[index].name}</td>
        <td>{committees[index].vismaId}</td>
        <td>{committees[index].active.toString()}</td>
        <td>
          <button>Open</button>
        </td>
      </tr>,
    )}
  }


  const pageSizeSelections: DropdownOption[] = [
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 25, label: '25' },
    { value: 100, label: '100' },
    { value: -1, label: 'All' },
  ]

  return (
    <div>
      <Tabs
        defaultActiveKey="purchases"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="purchases" title="Purchases">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          ></div>
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
                <Pagination>{items}</Pagination>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  Showing
                  <Select
                    getOptionLabel={(item: DropdownOption) => item.label}
                    getOptionValue={(item: DropdownOption) =>
                      item.value as string
                    }
                    options={pageSizeSelections}
                    defaultValue={pageSizeSelections[1]}
                    onChange={(option: DropdownOption | null) => {
                      if (option != null) {
                        setPurchasesPerPage(option.value as number)
                        numberOnClick(1)
                        getPurchases(option.value as number, 0)
                      }
                    }}
                  />
                  out of {purchasesLength}
                </div>
              </div>
              <div className="table-div">
                <table>
                  <thead>
                    <tr>
                      <th>Purchase Date</th>
                      <th>Name</th>
                      <th>Cost</th>
                      <th>Modal</th>
                    </tr>
                  </thead>
                  <tbody>{shownPurchases}</tbody>
                </table>
              </div>
              <Pagination>{items}</Pagination>
            </div>
          </div>
        </Tab>
        <Tab eventKey="committees" title="Committees">
          <div className="split-left">
            <div className="centered"
            >
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
        </Tab>
        <Tab eventKey="contact" title="Contact">
          
        </Tab>
      </Tabs>
      <AdminModal
        purchase={modalPurchase}
        handleClose={handleClose}
        updatePurchase={updatePurchase}
        show={show}
      />
    </div>
  )
}
