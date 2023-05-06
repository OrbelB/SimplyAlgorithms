// import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { wikiActions } from '../../../store/reducers/wiki-slice';
import './Categories.css';

const CustomCard = styled(Card)(() => ({
  backgroundColor: 'gray',
  color: 'white',
  fontSize: '2.2vw',
  fontFamily: 'Readex Pro, sans-serif',
  marginBottom: '1em',
  marginInline: '1em',
  borderRadius: '5px',
  border: '15px solid transparent',
  padding: '0.7em 0 0.7em 0',
  width: '440px',
}));

export default function Categories() {
  const dispatch = useDispatch();
  const { subCategories } = useSelector((state) => state.wiki);
  const navigate = useNavigate();
  const handleRedirect = (wikiName) => {
    dispatch(wikiActions.resetData());
    navigate(`/wiki/${wikiName}`);
  };
  return (
    <div className="wrap-collabsible">
      <h1 className="head">CATEGORIES</h1>
      <br />
      <br />
      <div className="container-xl">
        <div className="row justify-content-around">
          {subCategories.map((subCategory) => (
            <CustomCard
              elevation={6}
              variant="elevation"
              className="col-6 col-sm-6 text-center"
              style={{ backgroundColor: subCategory.rgb }}
              key={subCategory.wikiId}
            >
              <CardActionArea
                sx={{ minHeight: 190 }}
                onClick={() => handleRedirect(subCategory.wikiName)}
              >
                <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography gutterBottom variant="h3" component="h3">
                    {subCategory.wikiName}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </CustomCard>
          ))}
        </div>
      </div>
      <div className="bottom" />
    </div>
  );
}
