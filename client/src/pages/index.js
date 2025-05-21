import Calculator from '../components/calculator';
import Table from '../components/table';
import './index.css';

const Index = () => {

  return (
    <>
    <div className="page-container">
      <Calculator />
    </div>

    <div> 
        <h1>RabbitMQ Messages</h1>
      <ul id="messages">

      </ul>
      <Table/>  
    </div>
    </>
  );
};

export default Index;