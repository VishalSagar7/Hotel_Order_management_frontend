import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import BedroomChildRoundedIcon from '@mui/icons-material/BedroomChildRounded';
import { useSelector } from 'react-redux';
import useHotelAuth from '../customHooks/VerifyToken';
import AdminLoginForm from './AdminPages/AdminLoginForm';
import RoomLoginForm from './UserPages/RoomLoginForm';

const LoginOptions = () => {
    const isTokenValid = useHotelAuth();
    const hotelInfo = useSelector((store) => store.hotelInfo);

    // State to track which form to show
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedForm, setSelectedForm] = useState(null);

    if (!isTokenValid) {
        return null;
    }

    // Function to open the dialog with the correct form
    const handleOpenDialog = (formType) => {
        setSelectedForm(formType);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedForm(null);
    };

    // Function to render the correct form inside the Dialog
    const renderForm = () => {
        if (selectedForm === 'admin') {
            return <AdminLoginForm />;
        } else if (selectedForm === 'room') {
            return <RoomLoginForm />;
        }
        return null;
    };

    return (
        <div
            style={{
                backgroundImage: `url(${hotelInfo.hotelImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
            }}
            className='min-h-[100vh] flex items-center justify-center'
        >
            <h1
                style={{ textShadow: '2px 2px 3px rgba(0, 0, 0, 0.5)' }}
                className='text-[30px] absolute top-[30px] left-[80%] text-white font-bold z-10'>
                {hotelInfo.hotelName}
            </h1>

            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    zIndex: 1,
                }}
            />

            {/* Buttons */}
            <div className='relative z-10 flex gap-[100px]'>
                <Button
                    variant='contained'
                    onClick={() => handleOpenDialog('admin')}
                    sx={{
                        mt: 2,
                        height: '100px',
                        width: '150px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '5px',
                        bgcolor: '#EC2D01',
                        '&:hover': {
                            bgcolor: '#FF5A25',
                        },
                    }}
                >
                    <AdminPanelSettingsRoundedIcon sx={{ fontSize: '30px' }} />
                    Admin Login
                </Button>

                <Button
                    variant='contained'
                    onClick={() => handleOpenDialog('room')}
                    sx={{
                        mt: 2,
                        height: '100px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '5px',
                        width: '150px',
                        bgcolor: '#EC2D01',
                        '&:hover': {
                            bgcolor: '#FF5A25',
                        },
                    }}
                >
                    <BedroomChildRoundedIcon sx={{ fontSize: '30px' }} />
                    Room Login
                </Button>
            </div>

            {/* MUI Dialog */}
            <Dialog
                open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>
                    {selectedForm === 'admin' ? 'Admin Login' : 'Room Login'}
                </DialogTitle>
                <DialogContent>
                    {renderForm()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} sx={{ color: '#FF5A25' }}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default LoginOptions;
