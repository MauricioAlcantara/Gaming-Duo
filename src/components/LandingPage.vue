<template>
  <div class="landing-page">
    <section class="main-section">
      <div class="cards-container">
        <GameCard
            title="Encontre um Duo"
            imgUrl="/images/image-card-1.jpg"
            description="Conecte-se com parceiros ideais para seu estilo de jogo."
        />
        <GameCard
            title="Analise Perfis"
            imgUrl="/images/image-card-2.jpg"
            description="Analise habilidades de jogo para encontrar os parceiros ideais."
        />
        <GameCard
            title="Novidades do Site"
            imgUrl="/images/image-card-3.jpg"
            description="Atualização (0.1): Melhorias na página inicial e novas adições."
        />
        <GameCard
            title="Convide e Ganhe"
            imgUrl="/images/image-card-4.jpg"
            description="Convide amigos e ganhe recompensas exclusivas! Jogue e ganhe juntos."
        />
      </div>
    </section>
    <section id="jogos-populares-section" class="jogos-populares-section">
      <div class="container">
        <h2 class="section-title">Jogos Populares</h2>
        <div class="jogos-populares-cards">
          <CustomCard
              title="Valorant"
              imgUrl="/images/image-valorant.jpg"
              cardClass="large"
          />
          <CustomCard
              title="CS2"
              imgUrl="/images/image-cs2.jpg"
              cardClass="medium"
          />
          <CustomCard
              title="PUBG"
              imgUrl="/images/image-pubg.jpg"
              cardClass="small"
          />
        </div>
      </div>
    </section>
    <section id="quem-somos-section" class="quem-somos-section">
      <div class="container">
        <h2>Quem Somos</h2>
        <p><strong>Gaming Duo</strong> foi fundada em 2024 com um propósito claro: transformar como os jogadores se conectam e colaboram globalmente. Nascidos de uma paixão conjunta por jogos e tecnologia, nossa missão é facilitar encontros que ultrapassem fronteiras, proporcionando a cada jogador a chance de encontrar o parceiro ideal.</p>
        <h3>Nossa Missão</h3>
        <p>Enriquecer a experiência de jogo, tornando-a mais social e interativa. Buscamos ser o principal ponto de encontro para entusiastas de jogos, independente de onde estejam no mundo.</p>
        <h3>Nossos Valores</h3>
        <ul>
          <li><strong>Conexão Contínua:</strong> Criamos conexões que transcendem o jogo.</li>
          <li><strong>Qualidade Excepcional:</strong> Comprometidos com a excelência para garantir uma plataforma confiável.</li>
          <li><strong>Paixão por Jogos:</strong> Motivados por nossa paixão, buscamos continuamente melhorar a experiência de jogo.</li>
          <li><strong>Comunidade:</strong> Promovemos uma comunidade segura onde todos podem explorar, aprender e se divertir.</li>
        </ul>
        <p>Em <strong>Gaming Duo</strong>, olhamos sempre para o futuro, prontos para abraçar novas tecnologias e superar desafios que nos movem para frente.</p>
      </div>
    </section>
  </div>
</template>

<script>
import GameCard from './GameCard.vue';
import CustomCard from './CustomCard.vue';

export default {
  name: 'LandingPage',
  components: {
    GameCard,
    CustomCard
  }
}
</script>

<style scoped>
.main-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  min-height: 100vh;
  width: 100%;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 0%, transparent 100%), url('@/assets/background-image.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding-bottom: 5vh;
}

.cards-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
}

.quem-somos-section, .jogos-populares-section {
  background-color: #202020;
  color: #E0E0E0;
  padding: 50px 0;
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #D32F2F;
  position: relative;
}

h2::before, h2::after {
  content: "";
  position: absolute;
  height: 2px;
  width: calc(100% - 40px);
  left: 20px;
  bottom: -20px;
  background-color: #D32F2F;
}

p, li {
  font-size: 1.2rem;
  line-height: 1.8;
  color: #E0E0E0;
}

.jogos-populares-section {
  background-color: #545454;
  color: white;
  padding: 50px 0;
  text-align: center;
}

.jogos-populares-section .jogos-populares-cards {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
</style>
