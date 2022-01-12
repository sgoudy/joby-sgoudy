import {useState, React, useEffect } from 'react'
import axios from 'axios'
import {
    Grid,
    Box,
    ImageList,
    ImageListItem,
    Pagination,
    TextField,
    Typography
} from '@mui/material'
import apiKey from '../config';
import LargeImage from '../LargeImage'
import BasicPagination from '../Pagination'
import Header from '../Header'


export default function Home() {

    const [value, setValue] = useState('');
    const [query, setQuery] = useState('military aircraft')
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(false)
    const [urlLarge, setURLLarge] = useState('')
    const [openPopup, setOpenPopup] = useState(false)
    const [alt, setAlt]= useState('')
    const [page, setPage] = useState(1)
    const [windowSize, setWindowSize] = useState(false)
    
    const closeImage = () => {
        setOpenPopup(false)
      }

    const setNewPage = (val) => {
        setPage(val)
    }


    /**
     *  Requests images from unsplash
     *  @param {string} query 
     */
    const fetchData=()=>{
        setLoading(true);
        setWindowSize(false);
        console.log('query page ' + page)
        axios.get(`https://api.unsplash.com/search/photos/?page=${page}&per_page=30&query=${query}&client_id=${apiKey}`)
        .then(res => {
            setLoading(false);
            setImages(res.data.results);
        })
        .catch(error => {
            console.log('Error fetching and parsing results', error);
        });
    };

    /**
     * Updates images based on user query
     */
    useEffect(
    () => {
        window.addEventListener("resize", updateImageSize);
        fetchData()}, // eslint-disable-next-line
    [query, page],
    )

    /**
     * Query sent to API 
     * @param {*} e 
     */
    const handleSubmit=(e)=>{
        e.preventDefault();
        const data = new FormData(e.currentTarget); 
        setQuery(data.get('search'))
        setValue('')
    }

    const updateImageSize =()=>{
        setWindowSize({ windowSize: window.innerWidth > 1450 });
      }
    return (
        <Grid container component="main" sx={{ height: '100vh', m: 'auto' }}>

            <Header handleSubmit={handleSubmit} value={value} setValue={setValue}/>

            {/* Main Display*/}
            <Grid item xs={12} sx={{p: 2}}>

                <Box sx={{textAlign: 'center'}}>

                    {/*  Loading displays while fetching */}
                    {loading
                    ?   <Typography sx={{color: '#343a42'}}>
                        ...loading...
                        </Typography>
                    : null}

                    {/* Renders Large Image Modal */}
                    {urlLarge
                    ? 
                    <LargeImage
                        open={openPopup}
                        closeImage={closeImage}
                        url={urlLarge}
                        alt={alt}
                        />
                    : null}
                </Box>
                
                {/* Image Gallery */}
                <ImageList cols={3} rowHeight='auto'>
                    {images.map((image, key) => (
                        <ImageListItem key={key}>

                        {/* Identify desktop or mobile and render appropriate image size */}
                        {
                            windowSize
                            ? <img 
                            src={`${image.urls.full}`}
                            srcSet={`${image.urls.full}`}
                            loading="lazy"
                            alt={`${image.alt_description}`}
                            onClick={()=>{
                                setURLLarge(image.urls.full);
                                setAlt(image.alt_description)
                                setOpenPopup(true)
                                }}
                            />
                            : <img 
                            src={`${image.urls.thumb}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${image.urls.thumb}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            loading="lazy"
                            alt={`${image.alt_description}`}
                            onClick={()=>{
                                setURLLarge(image.urls.full);
                                setAlt(image.alt_description)
                                setOpenPopup(true)
                                }}
                        />
                            
                        }
                        
                        </ImageListItem>
                    ))}
                </ImageList>
            </Grid>

            {/* Pagination Filtering */}
            <BasicPagination setPage={setNewPage}/>
            
        </Grid>
    )
}