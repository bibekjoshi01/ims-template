import React, { useState } from 'react';

// project imports
import ProfileUpdate from './ProfileUpdate';
import ProfileView from './ProfileView';

export default function ProfileTab() {
  const [edit, setEdit] = useState(false);

  return (
    <React.Fragment>
      {edit ? <ProfileUpdate onCancel={() => setEdit(false)} /> : <ProfileView setEdit={() => setEdit(true)} />}
    </React.Fragment>
  );
}
