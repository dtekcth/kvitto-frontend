import Pagination from 'react-bootstrap/Pagination'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { getPaginatedPurchases, PurchaseWithId } from '../api/purchases'
import { useEffect, useState } from 'react'
import { DropdownOption } from '../components/Dropdown'
import Select from 'react-select'
import { AdminModal } from './AdminModal'

export const Admin = (): JSX.Element => {
  const items = []

  const [purchases, setPurchases] = useState<PurchaseWithId[]>([])
  const [purchasesLength, setPurchasesLength] = useState<number>(0)
  const [purchasesPerPage, setPurchasesPerPage] = useState<number>(10)
  const [active, setActive] = useState<number>(1)

  //AdminModal constants
  const initPurchase: PurchaseWithId = {
    id: -1,
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
    committeeId: 0,
    budgetPostId: 0,
    files: []
  }
  const [show, setShow] = useState(false);
  const [modalPurchase, setModalPurchase] = useState<PurchaseWithId>(initPurchase);
  const handleClose = (): void => {setShow(false)};
  const handleShow = (purchase:PurchaseWithId): void => {
    setModalPurchase(purchase)
    setShow(true)

  }

  const numberOnClick = (number: number): void => {
    setActive(number)
    getPurchases(purchasesPerPage, number - 1)
  }

  const getPurchases = (pageSize: number, pageNumber: number): void => {
    void getPaginatedPurchases(pageSize, pageNumber).then(result => {
      if (!(result instanceof Error)) {
        const temp: PurchaseWithId[] = []
        result.purchases.forEach((value: PurchaseWithId) => {
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
          <td>{purchases[index].id}</td>
          <td>{purchases[index].name}</td>
          <td>{purchases[index].description}</td>
          <td>
            {purchases[index].crowns},{oreStr}
          </td>
          <td>{purchases[index].isHandled.toString()}</td>
          <td>{purchases[index].isApproved.toString()}</td>
          <td>
            <button onClick={() => (handleShow(purchases[index]))}>Open</button>
          </td>
        </tr>,
      )
    }
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
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="Home">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Select
              getOptionLabel={(item: DropdownOption) => item.label}
              getOptionValue={(item: DropdownOption) => item.value as string}
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
            <div>Total number of purchases: {purchasesLength}</div>
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
                width: '50%',
              }}
            >
              <Pagination>{items}</Pagination>
              <div className="table-div">
                <table>
                  <thead>
                    <tr>
                      <th>Purchase ID</th>
                      <th>Name</th>
                      <th>Purchase Description</th>
                      <th>Cost</th>
                      <th>Is Handled?</th>
                      <th>Is Approved?</th>
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
        <Tab eventKey="profile" title="Profile">
          Tab content for Profile
        </Tab>
        <Tab eventKey="contact" title="Contact" disabled>
          Tab content for Contact
        </Tab>
      </Tabs>
    <AdminModal
      purchase={modalPurchase}
      handleClose={handleClose}
      show={show}
    />
    </div>

  )
}
