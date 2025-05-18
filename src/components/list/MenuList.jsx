import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenus, removeMenu } from '../../actions/menuActions';
import { selectMenus } from '../../selectors/menuSelectors';
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
// import { CSSPlugin } from 'gsap/CSSPlugin';
import './menuList.scss';

gsap.registerPlugin(Draggable);

const MenuList = () => {
  const menus = useSelector(selectMenus);
  const dispatch = useDispatch();
  // const container = React.createRef();
  // const menuElements = useRef([]);


  useEffect(() => {
    dispatch(fetchMenus());
  }, []);

  // // animated effect
  useEffect(() => {
    Draggable.create('.draggable', {
      type: "x, y",
      onPress: function() {
        console.log("clicked");
      }
    });
  }, [])

  const handleDelete = ({ target }) => {
    dispatch(removeMenu(target.value));
  };

  const menuElements = menus.map(menu => (
    <div key={menu.id} id="drag" className='draggable'>
      {/* <div> */}
        <p>{menu.item}</p>
        <p>{menu.detail}</p>
        <p>{menu.price}</p>
        <button value={menu.id} onClick={handleDelete}>🗑️</button>
      {/* </div> */}
    </div>
  ),
);

  return (
        <div data-testid="menus" className="draggable">
          {menuElements}
          {/* {menus.map((menu) => {
            const getRef = (el) => (menuElements.current.push(el))
            return (
            <div key={menu.id} ref={getRef} id="drag" className='draggable'>
            <p>{menu.item}</p>
            <p>{menu.detail}</p>
            <p>{menu.price}</p>
            <button value={menu.id} onClick={handleDelete}>🗑️</button>
          </div> */}
          {/* )})} */}
{/*         
      {console.log(menu.id, menu.ref, 'balifnlisenlsien')} */}
      </div>
  );
};

export default MenuList;
