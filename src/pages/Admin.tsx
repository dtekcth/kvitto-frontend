import Pagination from 'react-bootstrap/Pagination'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { getPaginatedPurchases, PurchaseWithId } from '../api/purchases'
import { useEffect, useState } from 'react'
import { DropdownOption } from '../components/Dropdown'
import Select from 'react-select'

export const Admin = (): JSX.Element => {
  const items = []

  const [purchases, setPurchases] = useState<PurchaseWithId[]>([])
  const [purchasesLength, setPurchasesLength] = useState<number>(0)
  const [purchasesPerPage, setPurchasesPerPage] = useState<number>(10)
  const [active, setActive] = useState<number>(1)

  const numberOnClick = (number: number): void => {
    console.log(number)
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
        console.log(result.numberOfPurchases)
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
      shownPurchases.push(
        <div key={purchases[index].id}>{purchases[index].name}</div>,
      )
    }
  }

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
              options={[
                { value: 5, label: '5' },
                { value: 10, label: '10' },
                { value: 25, label: '25' },
                { value: 100, label: '100' },
                { value: -1, label: 'All' },
              ]}
              onChange={(option: any | null, _) => {
                if (option != null) {
                  setPurchasesPerPage(option.value)
                  numberOnClick(1)
                  getPurchases(option.value, 0)
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
            <div>
              <Pagination>{items}</Pagination>
              {shownPurchases}
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
    </div>
  )
}
