export default (io) => {
    io.on('connection', (socket) => {
      console.log('Cliente conectado via WebSocket');
  
      socket.on('atualizar_placar', (novoPlacar) => {
        db.run(
          'UPDATE jogo_atual SET placar_casa = ?, placar_visitante = ? WHERE id = 1',
          [novoPlacar.home, novoPlacar.away],
          () => {
            io.emit('placar_atualizado', novoPlacar);
          }
        );
      });
  
      socket.on('atualizar_tempo', (novoTempo) => {
        db.run(
          'UPDATE jogo_atual SET tempo = ? WHERE id = 1',
          [novoTempo],
          () => {
            io.emit('tempo_atualizado', novoTempo);
          }
        );
      });
    });
  };