import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextFormatIcon from '@material-ui/icons/TextFormat';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Layout from '../Layout/';
import Modal from '../Modal';
import { addNewProduct, deleteProduct } from '../../redux/actions/general_actions';
import { v4 as uuidV4 } from 'uuid';

function Alert(props) {
  return (<MuiAlert elevation={6} variant='filled' 
    {...props} />);
}
const Main = () => {
  const dispatch = useDispatch();
  const products = useSelector(e => e.products);
  const [state, setState] = useState({
    open: false,
    fieldMessage: '',
    openWarning: false,
    warning: '',
    status: '',
    openDelete: false,
    deleteId: '',
  });
  const [product, setProduct] = useState({
    name: '',
    cost: '',
    iva: '',
    price: '',
  });
  const handleOpenAdd = () => {
    setState(prevState => ({
      ...prevState,
      open: true,
    }));
  };
  const handleOpenDelete = (id) => {
    setState(prevState => ({
      ...prevState,
      openDelete: true,
      deleteId: id,
    }));
  };
  const handleOpenWarning = (message, status) => {
    setState(prevState => ({
      ...prevState,
      openWarning: true,
      warning: message,
      status: status,
      open: false,
    }));
  };
  const handleCloseAdd = () => {
    setState(prevState => ({
      ...prevState,
      open: false,
    }));
    setProduct(prevState => ({
      ...prevState,
      name: '',
      cost: '',
      iva: '',
      price: '',
    }));
  };
  const handleCloseDelete = () => {
    setState(prevState => ({
      ...prevState,
      openDelete: false,
    }));
  };
  const handleCloseWarning = () => {
    setState(prevState => ({
      ...prevState,
      openWarning: false,
      warning: '',
    }));
    setProduct({
      name: '',
      cost: '',
      iva: '',
      price: '',
    });
  };
  const onChangeProduct = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    let price = 0;
    let cost = 0;
    let costTaxes = 0;

    if (name === 'cost') {
      cost = parseFloat(value);
      costTaxes = (cost / 100) * 16;
      price = cost + costTaxes;
    }

    if (name === 'price') {
      price = parseInt(value, 10);
      cost = Math.round(price / 1.16);
      costTaxes = Math.ceil(price - cost);
    }


    setProduct(prevState => ({
      ...prevState,
      price: Number.isNaN(price) ? '' : price,
      cost: Number.isNaN(cost) ? '' : cost,
      iva: Number.isNaN(costTaxes) ? '' : costTaxes,
      [name]: value,
    }))
  }
  const addProduct = () => {
    const { name, cost } = product;
    if (name === '' && cost === '') {
      setState(prevState => ({
        ...prevState,
        fieldMessage: 'Debes de completar todos los campos',
      }));
    } else {
      const uuidProduct = uuidV4();
      dispatch(addNewProduct({ ...product, uuidProduct }));
      handleOpenWarning('Se agrego el producto de manera exitosa!', 'success');
    }
  }
  const handleDelete = () => {
    const productsCopy = products;
    const indexProduct = productsCopy.findIndex(product => product.uuidProduct === state.deleteId);
    if (indexProduct > -1) {
      productsCopy.splice(indexProduct, 1);
      console.log(productsCopy);
      dispatch(deleteProduct(productsCopy));
      handleCloseDelete();
      handleOpenWarning('Se eliminó el producto de manera exitosa!', 'success');
    } else {
      handleOpenWarning('Ocurrio un error, intentelo más tarde', 'error');
    }
  }

  return (
    <Layout>
      <section className='children-content'>
        <div className='title-content'>
          <div className='help-text'>
            <h1>Bienvenido a la plataforma Demo</h1>
            <h2>Aqui puedes agregar, editar o eliminar tus productos.</h2>
          </div>
          <div className='help-action'>
            <Button variant='contained' color='secondary'
              onClick={handleOpenAdd}>
              Agregar producto <AiOutlinePlusCircle className='icon-button'/>
            </Button>
          </div>
        </div>
        <h1>Listado de productos</h1>
        <div className='cards-container'>
          {products.map(e => {
            return (
              <Card className='product-card' key={e.uuidProduct}>
                <CardContent>
                  <h1>Nombre del producto: {e.name}</h1>
                  <div className='card-desc'>
                    <p>Precio: {e.price}</p>
                    <p>Costo: {e.cost}</p>
                    <p>IVA: {e.iva}</p>
                  </div>
                </CardContent>
                <CardActions>
                  <Button variant='contained' color='primary'
                    onClick={() => handleOpenDelete(e.uuidProduct)}>
                    Eliminar
                  </Button>
                  <Button variant='contained' color='secondary'>
                    Editar
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        </div>
        <Modal handleOpen={handleOpenAdd} handleClose={handleCloseAdd} 
          open={state.open} >
          <div className='modal-add-content'>
            <label className='modal-help'>Si no sabes el costo del producto no te preocupes cuando ingreses el precio en automatico haremos el calculo del costo por ti.</label>
            <FormControl variant='standard' className='modal-form-control'>
              <InputLabel htmlFor='input-with-icon-adornment'>
                Nombre del producto
              </InputLabel>
              <Input value={product.name} name='name'
                onChange={onChangeProduct} placeholder='Ingresa el nombre'
                startAdornment={
                  <InputAdornment position='start'>
                    <TextFormatIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl variant='standard' className='modal-form-control'>
              <InputLabel htmlFor='input-with-icon-adornment'>
                Costo
              </InputLabel>
              <Input value={product.cost} name='cost'
                onChange={onChangeProduct} placeholder='Ingresa el costo'
                startAdornment={<InputAdornment position='start'><MonetizationOnIcon /> </InputAdornment>}
              />
            </FormControl>
            <FormControl variant='standard' className='modal-form-control'
              disabled={true} >
              <InputLabel htmlFor='input-with-icon-adornment'>
                IVA 16%
              </InputLabel>
              <Input value={product.iva} name='iva'
                onChange={onChangeProduct} placeholder='El IVA se calcula automaticamente'
                startAdornment={
                  <InputAdornment position='start'>
                    <MonetizationOnIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl variant='standard' className='modal-form-control'>
              <InputLabel htmlFor='input-with-icon-adornment'>
                Precio
              </InputLabel>
              <Input value={product.price} name='price'
                onChange={onChangeProduct} placeholder='Ingresa el precio'
                startAdornment={
                  <InputAdornment position='start'>
                    <MonetizationOnIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
            <div className='validation-area'>
              <p>{state.fieldMessage !== '' ? state.fieldMessage : ''}</p>
            </div>
            <div className='modal-actions'>
              <Button variant='outlined' className='modal-button-cancel'
                onClick={handleCloseAdd}>
                Cancelar
              </Button>
              <Button variant='contained' onClick={addProduct}
                className='modal-button-add'>
                Agregar
              </Button>
            </div>
          </div>
        </Modal>
        <Snackbar autoHideDuration={6000} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={state.openWarning} onClose={handleCloseWarning}
          key={'warning-snack'}
        >
          <Alert onClose={handleCloseWarning} severity={state.status}>
            {state.warning}
          </Alert>
        </Snackbar>
        <Modal handleOpen={handleOpenDelete} handleClose={handleCloseDelete}
          open={state.openDelete}>
          <div className='modal-add-content'>
            <label className='modal-help'>¿Seguro que deseas eliminar este producto?</label>
            <CardActions>
              <Button variant='contained' color='primary'
                onClick={handleDelete}>
                Si, eliminar
              </Button>
              <Button variant='contained' color='secondary'
                onClick={handleCloseDelete}>
                Cancelar
              </Button>
            </CardActions>
          </div>
        </Modal>
      </section>
    </Layout>
  );
};

export default Main;
