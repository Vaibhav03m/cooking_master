import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { projectFirestore } from '../../firebase/config'
import './UpdateRecipe.css'

export default function UpdateRecipe() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [recipe, setRecipe] = useState(null)
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [cookingTime, setCookingTime] = useState('')
  const [newIngredient, setNewIngredient] = useState('')
  const [ingredients, setIngredients] = useState([])

  useEffect(() => {
    setIsPending(true)

    const unsub = projectFirestore.collection('recipes').doc(id).onSnapshot(
      (doc) => {
        if (doc.exists) {
          const data = doc.data()
          setRecipe(data)
          setTitle(data.title)
          setMethod(data.method)
          setCookingTime(data.cookingTime)
          setIngredients(data.ingredients)
          setIsPending(false)
        } else {
          setIsPending(false)
          setError('Could not find that recipe')
        }
      },
      (err) => {
        setIsPending(false);
        setError('Failed to fetch the recipe')
      }
    );

    return () => unsub()
  }, [id]);

  const handleAddIngredient = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim()

    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, ing])
    }
    setNewIngredient('')
  };

  const handleDeleteIngredient = (ingredient) => {
    setIngredients(ingredients.filter((ing) => ing !== ingredient))
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!title || !method || !cookingTime || ingredients.length === 0) {
      setError('Please fill in all fields');
      return;
    }

    const updatedRecipe = {
      title,
      method,
      cookingTime,
      ingredients,
    };

    projectFirestore.collection('recipes').doc(id).update(updatedRecipe)
      .then(() => {
        setRecipe(updatedRecipe);
        navigate(`/recipes/${id}`, { replace: true });
      })
      .catch((err) => {
        setError('Failed to update the recipe');
      });
  };


  return (
    <div className="update-recipe">
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className="update-title">Update Recipe</h2>
          <form className="update-form" onSubmit={handleSubmit}>
            <label className="form-label">
              <span>Title:</span>
              <input
                type="text"
                className="form-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>

            <label className="form-label">
              <span>Method:</span>
              <textarea
                className="form-textarea"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              />
            </label>

            <label className="form-label">
              <span>Cooking Time (minutes):</span>
              <input
                type="text"
                className="form-input"
                value={cookingTime}
                onChange={(e) => setCookingTime(e.target.value)}
              />
            </label>

            <label className="form-label">
              <span>Ingredients:</span>
              <div className="ingredients">
                <input
                  type="text"
                  className="form-input"
                  value={newIngredient}
                  onChange={(e) => setNewIngredient(e.target.value)}
                />
                <button type="button" className="ingredients-button" onClick={handleAddIngredient}>Add</button>
              </div>
              <ul className="ingredients-list">
                {ingredients.map((ing, index) => (
                  <li key={index} className="ingredients-list-item">
                    {ing}
                    <button type="button" className="delete-button" onClick={() => handleDeleteIngredient(ing)}>Remove</button>
                  </li>
                ))}
              </ul>
            </label>

            <div className="submit-button">
              <button type="submit" className="form-submit-button">Update Recipe</button>
            </div>
          </form>
          {error && <p className="error">{error}</p>}
        </>
      )}
    </div>
  );
}
