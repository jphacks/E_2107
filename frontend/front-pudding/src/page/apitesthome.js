import React, {useState, useEffect}  from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import {Typography} from '@mui/material';
import { NavLink } from 'react-router-dom';
// import convertFormat from '../function/Convert';
import { withCookies } from 'react-cookie';
import { API_BASE_URL } from '../api/index';

/**
* @author
* @function Home
**/

const Home = (props) => {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/self_introductions/`, {
        headers: {
          'Authorization': `JWT ${props.cookies.get('user-token')}`
        }
      })
        .then(res => {
            const profile = res.data;
            setProfile(profile);
        })
        .catch(err => {
            console.log(err);
      });
  }, [props.cookies]);

  return(
     <div>
        {
          profile.map(profile => {
            return (
              <Card
                    key={`ranking-item-${profile.uuid }`}
                    style={{ maxWidth: '500px', margin: '32px auto'}}
                    src={`post/${profile.uuid}`}
               >
                 <NavLink key={profile.uuid} to={`/post/${profile.uuid}`}>
                   <CardMedia
                     image={profile.image ? API_BASE_URL+profile.image: 'http://design-ec.com/d/e_others_50/l_e_others_500.png'}
                     title={profile.title}
                     style={{ height: '200px' }}
                   />
                   <CardContent>
                     <Typography type="title" variant="h4">
                       {profile.title}
                     </Typography>
                     <Typography className='right-placement' type="title" >
                       by {profile.user.username}
                     </Typography>
                     <Typography className='right-placement' type="title" >
                       {/* {convertFormat(profile.created_at)} */}
                     </Typography>
                   </CardContent>
                 </NavLink>
              </Card>
            )
          })
        }
      </div>
   )

 }

export default withCookies(Home)