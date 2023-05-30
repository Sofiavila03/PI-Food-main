import styles from "./Home.module.css";
import Card from "../Card/Card";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllRecipes,
  filterByOrigin,
  filterRecipeByDiets,
  orderRecipeAlphabetic,
  healthScoreOrder,
  getDiets,
  deleteFilters,
  cleanStates
} from "../../redux/actions";
import { useEffect, useState } from "react";
import loader from "../../img/giphy (1).webp";
import Paginado from "../Paginado/Paginado";

export default function HomePage(props) {
  const { myRecipes, loading, diets } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllRecipes());
    dispatch(cleanStates())
  }, [dispatch]);
  useEffect(() => {
    if (!diets.length) {
      dispatch(getDiets())
    }
  }, [dispatch, diets])
  // console.log(myRecipes);
  const [page, setPage] = useState(1);
  const finalPage = page * 9; //9 indica la cantidad de recetas que voy a mostrar por página
  const startPage = finalPage - 9;
  const actualPage = myRecipes?.slice(startPage, finalPage)
  const totalPages = Math.ceil(myRecipes.length / 9);
  const handlerPrevPage = () => {
    setPage(page - 1);
  };
  const handlerNextPage = () => {
    setPage(page + 1);
  };
  const handlerPageNumber = (n) => {
    setPage(n);
  };
  const filterHandler = (event) => {
    const { name, value } = event.target;
    if (name === "Diets") {
      dispatch(filterRecipeByDiets(value));
      setPage(1)
    } else {
      dispatch(filterByOrigin(value));
      setPage(1)
    }
    if (value === 'All') {
      dispatch(deleteFilters())
      setPage(1)
    }
  };
  const orderHandler = (event) => {
    const { name, value } = event.target;
    if (name === "Alphabetic") {
      dispatch(orderRecipeAlphabetic(value));
    } else {
      dispatch(healthScoreOrder(value));
    }
  };
  const reset = () => {
    dispatch(deleteFilters());
    const selectElements = document.getElementsByTagName("select");
    for (let i = 0; i < selectElements.length; i++) {
      selectElements[i].selectedIndex = 0;
    }
  };
  return (
    <div>
      <div className={styles.options}>
        <select name="Origin" onChange={filterHandler} defaultValue='Filter By Origin'>
          <option disabled >Filter By</option>
          <option value="All">All</option>
          <option value="Api">Api</option>
          <option value="DataBase">DataBase</option>
        </select>
        <select name="Diets" onChange={filterHandler} defaultValue='Filter By Diets'>
          <option disabled >Filter By</option>
          <option value="All">All</option>
          {diets?.map((diet) => {
            return (
              <option value={diet.name} key={diet.id}>
                {diet.name}
              </option>
            );
          })}
        </select>
        <select name="Alphabetic" onChange={orderHandler} defaultValue='Alphabetic Order'>
          <option disabled >Order By</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
        <select name="HealthScore" onChange={orderHandler} defaultValue='HealthScore Order'>
          <option disabled > Order By</option>
          <option value="Ascendente">Ascendente</option>
          <option value="Descendente">Descendente</option>
        </select>
        <button onClick={reset}>Reset</button>
      </div>
      <br />
      <div className={styles.paginado}>
        <Paginado
          totalPages={totalPages}
          page={page}
          prevPage={handlerPrevPage}
          nextPage={handlerNextPage}
          pageNumber={handlerPageNumber}
        />
      </div>
      <div className={styles.contenedor}>
        {loading ? (
          <div className={styles.loader}>
            <img src={loader} alt="Loading" />
          </div>

        )
          : actualPage.length > 0 ? (
            actualPage.map((recipe) => {
              return (
                <div key={recipe.id}>
                  <Card
                    id={recipe.id}
                    title={recipe.title}
                    image={recipe.image}
                    diets={recipe.diets}
                    healthScore={recipe.healthScore}
                  />
                </div>
              );
            })
          ) : (
            <h2>
              I did not find the recipe you are looking for, but we are working on it
            </h2>
          )}
      </div>
    </div>
  );
}