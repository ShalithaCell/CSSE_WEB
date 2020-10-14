import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

export default function title(props) {
  return (
      <Typography component="h2" variant="h6" color="primary">
          { props.children }
      </Typography>
  );
}

title.propTypes = {
  children : PropTypes.node
};
