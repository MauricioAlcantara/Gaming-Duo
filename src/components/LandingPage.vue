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
              title="CS2"
              imgUrl="/images/image-cs2.jpg"
              cardClass="medium"
          />
          <CustomCard
              title="Valorant"
              imgUrl="/images/image-valorant.jpg"
              cardClass="large"
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
  background-image: url('@/assets/background-image.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding-bottom: 5vh;
  position: relative;
}

.main-section::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 150px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(32, 32, 32, 0.8) 80%, #202020 100%);
}

.cards-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
}

.jogos-populares-section, .quem-somos-section {
  background-color: #202020;
  color: #E0E0E0;
  padding: 50px 0;
  text-align: center;
  position: relative;
}

.jogos-populares-section::before, .quem-somos-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 80%, #202020 100%);
  z-index: -1;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #f90404;
  position: relative;
}

h2::before, h2::after {
  content: "";
  position: absolute;
  height: 2px;
  width: calc(100% - 40px);
  left: 20px;
  bottom: -20px;
  background-color: #f90404;
}

p, li {
  font-size: 1.2rem;
  line-height: 1.8;
  color: #E0E0E0;
}

.jogos-populares-section .jogos-populares-cards, .quem-somos-section {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.section-title {
  margin-bottom: 100px;
}
</style>
