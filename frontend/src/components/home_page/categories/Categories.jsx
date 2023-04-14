// import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { wikiActions } from '../../../store/reducers/wiki-slice';
import './Categories.css';

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
            <Card
              elevation={6}
              variant="elevation"
              className="col-6 col-sm-6 text-center topic"
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
                  {/* <Typography
                    variant="body1"
                    color="#F8F8F8"
                    textAlign="center"
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </Typography> */}
                </CardContent>
              </CardActionArea>
            </Card>
            /* <Button
                style={{ backgroundColor: subCategory.rgb }}
                className="topic"
                onClick={() => handleRedirect(subCategory.wikiName)}
              >
                {subCategory.wikiName}
              </Button> */
          ))}
        </div>
      </div>
      <div className="bottom" />
    </div>
  );
}
