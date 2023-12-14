import Pagination from 'react-bootstrap/Pagination';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { getPurchases, PurchaseWithId } from '../api/purchases';
import { useEffect, useState } from 'react';

export const Admin = (): JSX.Element => {
  const purchasesPerPage = 10;
  const items = [];

  const [purchases, setPurchases] = useState<PurchaseWithId[]>([])
  const [active, setActive] = useState<number>(1)


  const numberOnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    console.log(event.currentTarget.innerText)
    setActive(+event.currentTarget.innerText);
    
  }

  for (let number = 1; number <= Math.ceil(purchases.length/purchasesPerPage); number++) {
    items.push(
      <Pagination.Item key={number} onClick={numberOnClick} active={number === active}>
        {number}
      </Pagination.Item>,
    );
  }

  useEffect(() => {
    void getPurchases().then(result => {
      if (!(result instanceof Error)) {
        const temp: PurchaseWithId[] = []
        result.forEach((value: PurchaseWithId) => {
          temp.push(value)
        })
        console.log(temp)
        setPurchases(temp)
      }
    })
  }, [])

  const shownPurchases = []
  for (let index = purchasesPerPage * (active - 1); index <= (purchasesPerPage * (active)); index++) {
    if(purchases[index] != null) {
      shownPurchases.push(<div key={purchases[index].id}>{purchases[index].name}</div>)
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
        <div style={{display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center'}}>
          
            <div>{shownPurchases}
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
    </div>  )
}
