import React, { useState, useEffect } from 'react';
import "./Homepage.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { postRecord } from '../../app/features/PostSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getRecords } from '../../app/features/GetRecordsSlice';
import { updateRecord } from '../../app/features/UpdateRecordSlice';
import { deleteRecord } from '../../app/features/DeleteRecordSlice';


import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
       
        color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function Homepage() {


    const [userName, setUserName] = useState("");
    const [age, setAge] = useState("");
    const [id, setId] = useState(0);
    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);
    const [change, setChange] = useState(true);
    let data = [""];

    const records = useSelector(state => state.get.records);
    console.log(records.readRecordData);
    if (records.readRecordData) {
        data = records.readRecordData;
    }



    function handleChangeUserName(e) {
        setUserName(e.target.value);
        // console.log(userName);
    }
    function handleChangeAge(e) {
        setAge(e.target.value);
        // console.log(age);
    }



    function handleDeleteButton(id) {
        console.log("delete button clicked");
        console.log(id)
        setId(id);
        dispatch(deleteRecord(id));
        setChange(!change);
    }

    function handleEditButton(id, userName, age) {
        setUserName(userName);
        setAge(age);
        setId(id);
        setEditMode(true);
    }


    function handleUpdate(e) {
        e.preventDefault();
        console.log(id);
        console.log(userName);
        console.log(age);
        dispatch(updateRecord({ id, userName, age }));
        setEditMode(false);
        setChange(!change);
    }


    useEffect(() => {
        console.log(change);
        dispatch(getRecords());
    }, [change, dispatch])

    const objBody = {
        userName: String,
        age: Number
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(userName, age);
        objBody.userName = userName;
        objBody.age = age;
        setChange(!change);
        dispatch(postRecord(objBody));
    }

    const RecordsArray = data.map((record, index) => {
        return (
            <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                    {record.id}
                </StyledTableCell>
                <StyledTableCell >{record.userName}</StyledTableCell>
                <StyledTableCell >{record.age}</StyledTableCell>
               
                <IconButton edge="end" aria-label="edit" onClick={() => { handleEditButton((record.id), (record.userName), (record.age)) }}>
                      <EditIcon />
                    </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => { handleDeleteButton((record.id)) }}>
                      <DeleteIcon />
                    </IconButton>
            </StyledTableRow>
            
        )
    }
    )

    function handleCancel() {
        setEditMode(false);
        setUserName("");
        setAge("");
    }

    function updateRecordButtons() {
        return (
            <div className='update-buttons'>
                <Button variant="contained" onClick={(e) => { handleUpdate(e) }}>Update</Button>
                <Button variant="contained" onClick={() => { handleCancel() }}>Cancel</Button>
            </div>
        )
    }

    const headCells = [
        {
            id: 'id',
            numeric: false,
            disablePadding: true,
            label: 'Dessert (100g serving)',
        },
        {
            id: 'Name',
            numeric: true,
            disablePadding: false,
            label: 'Calories',
        },
        {
            id: 'Age',
            numeric: true,
            disablePadding: false,
            label: 'Fat (g)',
        },
    ];




    return (


        <div className='MainContainer'>
            <div className='SubContainer'>
                <div className="Box1">
                    <div className='InputContainer'>
                        <div className='flexContainer'>
                            <TextField
                                fullWidth
                                label="UserName"
                                name="UserName"
                                size='small'
                                variant="outlined"
                                value={userName}
                                onChange={(e) => { handleChangeUserName(e) }} />
                        </div>
                        <div className='flexContainer'>
                            <TextField
                                fullWidth
                                label="Age"
                                name="Age"
                                size='small'
                                variant="outlined"
                                value={age}
                                onChange={(e) => { handleChangeAge(e) }} />
                        </div>
                        <div className='flexButton'>
                            {editMode ? updateRecordButtons()
                                : <Button variant="contained" onClick={(e) => { handleSubmit(e) }}>Add</Button>}
                        </div>

                    </div>

                </div>
                <div className="Box2">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth:500 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Id</StyledTableCell>
                                    <StyledTableCell >Name</StyledTableCell>
                                    <StyledTableCell >Age</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {RecordsArray}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>

    );
}