import React from 'react'

function Carousel() {
  return (
    <div className='container-fluid h-4'><div id="carouselExampleIndicators" class="carousel slide">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="https://img.onmanorama.com/content/dam/mm/en/kerala/top-news/images/2023/9/16/K-Premkumar-MLA-of-Ottapalam.jpg.transform/schema-16x9/image.jpg" class="d-block w-100" alt="Project image One"/>
      </div>
      <div class="carousel-item">
        <img src="https://assets.jci.cc/images/projects/000/000/528/large/5018.jpg?1499373334" class="d-block w-100" alt="Project image Two"/>
      </div>
      <div class="carousel-item">
        <img src="https://malayalam.oneindia.com/img/2023/01/palakkad-1674934193.jpg" class="d-block w-100" alt="Project image Three"/>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div></div>
  )
}

export default Carousel