// in App or a top-level component
useEffect(() => {
  if (user) {
    const token = localStorage.getItem('token');
    const s = connectSocket(token);
    // join personal room and admin room if admin
    s.emit('joinRoom', String(user.id));
    if (user.role === 'admin') s.emit('joinRoom', 'admins');
    s.on('task:assigned', (task) => { /* update UI */ });
    s.on('submission:created', (submission) => { /* show notification */ });
    return () => s.disconnect();
  }
}, [user]);
