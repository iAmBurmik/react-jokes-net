import { useCallback, useEffect, useState } from 'react';
import useHttp from '../../hooks/use-http';
import { getComments } from '../../utils/firebase-api';
import { useParams } from 'react-router';
import styles from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import CommentsList from './CommentsList';
import Loader from '../UI/Loader';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const {sendHttpRequest, data: jokesComments, error, status} = useHttp(getComments, true);
  const params = useParams();
  const {jokeId} = params;

  useEffect(() => {
    sendHttpRequest(jokeId);
  }, [sendHttpRequest, jokeId]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const commentAddedHandler = useCallback(() => {
    sendHttpRequest(jokeId);
  }, [sendHttpRequest, jokeId]);

  let content;

  if(status === 'pending') {
    content = <div className="centered"> <Loader /></div>
  }

  if(error) {
    content = <p className="centered">{error}</p>;
  }

  if(status === 'completed' && (jokesComments && jokesComments.length > 0)) {
    content = content = <CommentsList comments={jokesComments}/>
  }

  if(status === 'completed' && (!jokesComments || jokesComments.length === 0)) {
    content = <p className='centered'>This joke doesn't have comments yet</p>;
  }

  

  return (
    <section className={styles.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm onCommentAdded={commentAddedHandler} jokeId={params.jokeId}/>}
      {content}
    </section>
  );
};

export default Comments;
