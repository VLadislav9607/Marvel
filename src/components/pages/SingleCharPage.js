import '../pages/singleCharPage.scss';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './singleComic.scss';

const SingleCharPage = () => {

   const { charId } = useParams();
   const [char, setChar] = useState(null);
   const { loading, error, getCharacter, clearError } = useMarvelService();

   useEffect(() => {
      updateChar();
   }, [charId]);


   const onCharLoaded = (char) => {
      setChar(char);
   };

   function updateChar() {
      clearError();
      getCharacter(charId)
         .then(onCharLoaded)
   }

   const errorMessage = error ? <ErrorMessage /> : null;
   const spinner = loading ? <Spinner /> : null;
   const content = !(loading || error || !char) ? <View char={char} /> : null;

   return (
      <>
         {errorMessage}
         {spinner}
         {content}
      </>
   )
}

const View = ({ char }) => {

   const { name, description, thumbnail } = char;

   return (
      <div className="single-comic">
         <img src={thumbnail} alt={name} className="single-comic__char-img" />
         <div className="single-comic__info">
            <h2 className="single-comic__name">{name}</h2>
            <p className="single-comic__descr">{description}</p>
         </div>
      </div>
   )
}


// const SingleCharPage = ({data}) => {

//  const {name, description, thumbnail} = data;

//  return (
//      <div className="single-comic">
//          <img src={thumbnail} alt={name} className="single-comic__char-img"/>
//          <div className="single-comic__info">
//              <h2 className="single-comic__name">{name}</h2>
//              <p className="single-comic__descr">{description}</p>
//          </div>
//      </div>
//  )
// }

export default SingleCharPage;