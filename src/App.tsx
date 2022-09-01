import { Header } from './components/Header';
import styles from './App.module.css';

import './global.css';
import { TaskList } from './components/TaskList';


function App() {

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <TaskList />
      </div>
    </div>
  )
}

export default App
