import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { projectFirestore } from '../../firebase/config'
import './Recipe.css'

export default function Recipe() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [recipe, setRecipe] = useState(null)

  useEffect(() => {
    setIsPending(true)

    const unsub = projectFirestore.collection('recipes').doc(id).onSnapshot(
      (doc) => {
        if (doc.exists) {
          const data = doc.data()
          setIsPending(false)
          setRecipe(data)
        } else {
          setIsPending(false)
          setError('Could not find that recipe')
        }
      }
    )

    return () => unsub()
  }, [id]);

  const handleUpdateClick = () => {
    navigate(`/recipes/${id}/update`)
  };

  return (
    <div className="recipe">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}

      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            <li>Ingredients</li>
            {recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
          </ul>
          <p className="method">{recipe.method}</p>
          <div className="update-button">
            <button onClick={handleUpdateClick} className='update-btn'>Update</button>
          </div>
        </>
      )}
    </div>
  );
}
