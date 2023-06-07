import styles from "./Form.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import validation from "./validation";
import { addRecipe } from "../../redux/actions";
import { useNavigate, NavLink } from "react-router-dom";

export default function Form(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { diets } = useSelector((state) => state);
  const [diet, setDiet] = useState([]); //para almacenar las dietas seleccionadas
  const [recipe, setRecipe] = useState({ //para manejar el estado del formulario de la receta 
    title: "",
    image: "",
    summary: "",
    healthScore: 1,
    steps: "",
    diets: [],
  });
  const [errors, setErrors] = useState({ //para manejar los errores de validacion del formulario
    title: "",
    image: "",
    summary: "",
    healthScore: 1,
    steps: "",
    diets: [],
  });
  const inputChange = (event) => { //actualiza el estado de recipe,realiza la validacion y actualiza el estado de errors
    const { name, value } = event.target;
    setRecipe({
      ...recipe,
      [name]: value,
    });
    setErrors(
      validation({
        ...recipe,
        [name]: value,
      })
    );
  };
  const handlerSubmit = (event) => {
    event.preventDefault(); //evita que se envie el form y se recargue la pagina
    setRecipe({ ...recipe, diets: diets });
    dispatch(addRecipe(recipe));
    alert("Recipe created successfully!");
    navigate("/home");
  };

  const mapDiets = () => {
    const filtered = diets.filter((d) => !diet.includes(d.name));//para iterar sobre cada elemento d en diets y verificar si el nombre de la dieta d.name no está incluido en el arreglo diet. Si no está incluido, se mantiene en el arreglo filtered, de lo contrario, se descarta
    return filtered.map((di, i) => {
      return (
        <option value={di.name} key={i}>
          {di.name}
        </option>
      );
    });
  };

  const dietHandler = (event) => {
    if (event.target.value) { //verifica si el valor seleccionado no es nulo
      setDiet([...diet, event.target.value]); //se agrega el valor seleccionado al estado diet
      setRecipe({ ...recipe, diets: [...diet, event.target.value] });
      console.log("SUBIDA A LA RECETA");
      event.target.value = "Choose your diets";
    }

  };

  const deleteDiet = (event) => {
    setDiet(diet.filter((d) => d !== event));
    setRecipe({
      ...recipe,
      diets: recipe.diets.filter((d) => d !== event),
    });
  };

  return (
    <div className={styles.container}>
      <NavLink to="/home">
        <button className={styles.boton}>⬅</button>
      </NavLink>
      <form onSubmit={handlerSubmit}>
        <label>Title: </label>
        <input
          type="text"
          name="title"
          value={recipe.title}
          onChange={inputChange}
        />
        {errors.title && <p className={styles.error}>{errors.title}</p>}
        <label>Image: </label>
        <input
          type="text"
          name="image"
          value={recipe.image}
          onChange={inputChange}
        />
        {errors.image && <p className={styles.error}>{errors.image}</p>}
        <label>Summary: </label>
        <textarea
          type="text"
          name="summary"
          value={recipe.summary}
          onChange={inputChange}
        />
        {errors.summary && <p className={styles.error}>{errors.summary}</p>}
        <label>HealthScore: {recipe.healthScore} </label>
        <input
          id="range-input"
          name="healthScore"
          type="range"
          min="1"
          max="100"
          value={recipe.healthScore}
          onChange={inputChange}
        />
        <label>Steps: </label>
        <textarea
          type="text"
          name="steps"
          value={recipe.steps}
          onChange={inputChange}
        />
        {errors.steps && <p className={styles.error}>{errors.steps}</p>}
        <label>Diets: </label>
        <select
          onChange={dietHandler}
          name="diets"
          defaultValue="Choose your diets"
        >
          <option disabled value="Choose your diets">
            Choose your diets
          </option>
          {mapDiets()}
        </select>
        <div className={styles.formDiets}>
          {diet?.map((d, i) => {
            return (
              <button key={i} type="button" onClick={() => deleteDiet(d)}>
                {d}
              </button>
            );
          })}
        </div>
        {errors.diets && <p className={styles.error}>{errors.diets}</p>}
        {!errors.title &&
          !errors.image &&
          !errors.summary &&
          !errors.healthScore &&
          !errors.steps &&
          diet.length >= 1 ? (
          <button className={styles.createButton}>Create</button>
        ) : (
          <button disabled className={styles.disabledButton}>
            Create
          </button>
        )}
      </form>
    </div>
  );
}

