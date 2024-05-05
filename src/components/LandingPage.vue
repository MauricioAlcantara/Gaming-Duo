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
        <p>Gaming Duo foi criada com a visão de transformar a maneira como os jogadores se conectam e colaboram. Fundada em 2024 por uma equipe apaixonada por jogos e tecnologia, nossa missão é facilitar encontros entre jogadores ao redor do mundo, proporcionando a cada um deles a oportunidade de encontrar o parceiro ideal para jogar.</p>
        <p>Desde o início, nos comprometemos a ser uma ponte para novas amizades e experiências compartilhadas. Acreditamos que jogar juntos não apenas melhora a experiência de jogo, mas também fortalece laços comunitários. Nossa plataforma é projetada para ser intuitiva e acolhedora, permitindo que jogadores de todos os níveis encontrem alguém compatível para jogar e crescer juntos.</p>
        <h3>Nossa Missão</h3>
        <p>Nossa missão é enriquecer a experiência de jogo, tornando-a mais social e interativa. Gaming Duo busca ser o principal ponto de encontro para jogadores que desejam compartilhar suas aventuras com outros entusiastas, independente de onde estejam no mundo.</p>
        <h3>Nossos Valores</h3>
        <ul>
          <li>Conexão Contínua: Nos dedicamos a criar conexões significativas que transcendem o jogo.</li>
          <li>Qualidade Excepcional: Nosso compromisso com a excelência garante uma plataforma confiável e agradável.</li>
          <li>Paixão por Jogos: Movidos pela nossa paixão, estamos sempre buscando maneiras de melhorar a experiência dos nossos usuários.</li>
          <li>Comunidade: Fomentamos uma comunidade onde todos se sintam seguros para explorar, aprender e se divertir.</li>
        </ul>
        <p>Em Gaming Duo, olhamos sempre para o futuro, prontos para abraçar novas tecnologias e superar desafios que nos movem para frente. Convidamos você a se juntar a nós nessa jornada emocionante pelo mundo dos jogos online.</p>
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
}

.cards-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
}

.quem-somos-section {
  background-color: #1a1a1a;
  color: white;
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
  color: #f44336;
}

h2::before, h2::after {
  content: "";
  position: absolute;
  height: 2px;
  width: calc(100% - 40px);
  left: 20px;
  bottom: -20px;
}

p {
  font-size: 1.2rem;
  line-height: 1.8;
}

.jogos-populares-section {
  background-color: #474747;
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
