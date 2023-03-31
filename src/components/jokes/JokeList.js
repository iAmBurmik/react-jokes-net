import { Fragment } from 'react';
import JokeItem from './JokeItem';
import styles from './JokeList.module.css';
import { useNavigate, useLocation } from 'react-router';

const sortJokes = (jokes, isAscending) => {
  return jokes.sort((joke1, joke2) => {
    if(isAscending) {
      return joke1.id > joke2.id ? 1 : -1;
    } else {
      return joke1.id < joke2.id ? 1 : -1;
    }
  });
}

const JokeList = (props) => {

  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const sortingOrder = queryParams.get('sort');
  const isSortAscending = sortingOrder === 'asc';
  sortJokes(props.jokes, isSortAscending);

  const toggleSortingHandler = () => {
    navigate('/jokes?sort=' + (isSortAscending ? 'desc' : 'asc'));
  };

  return (
    <Fragment>
      <div className={styles.filter}>
        <button onClick={toggleSortingHandler}>Sort Jokes by {isSortAscending ? 'Descending' : 'Ascending'}</button>
      </div>
      <ul className={styles.list}>
      {props.jokes.map((joke) => (
        <JokeItem
          key={joke.id}
          id={joke.id}
          topic={joke.topic}
          text={joke.text}
        />
      ))}
    </ul>
    </Fragment>
  );
};

export default JokeList;
