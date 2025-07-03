import { Container, Row, Col, Card, Carousel } from 'react-bootstrap';
import StyledCarousel from '../common/StyledCarousel';
import StyledCard from '../common/StyledCard'
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Loading from '../common/Loading'
import { getData } from '../common/utilities';
import ModalPhoto from '../common/ModalPhoto';

const StyledA = styled.a`
    text-decoration: none;

    &:visited {
        color: light-blue;
    }
`

const imgPrefix = 'https://raw.githubusercontent.com/ccrayp/ccrayp-api/refs/heads/main/assets/posts/'

function Achievement({ achievement, modalPhotoFunctions }) {
    
     const { setPhotoLabel, setPhotoPath, setShowModal } = modalPhotoFunctions;

    function openPhoto() {
        setPhotoLabel(achievement.label)
        setPhotoPath(imgPrefix + achievement.img)
        setShowModal(true)
    }

    return (
        <div>
            <Card.Header><h5>{achievement.label}</h5></Card.Header>
            <Card.Body className="p-4 md-5">
                <Row>
                    <Col md={6}>
                        <Card.Img onClick={openPhoto} style={{ maxHeight: '400px', objectFit: 'contain', cursor: 'pointer' }} src={imgPrefix + achievement.img} alt={achievement.label} />
                    </Col>
                    <Col md={6}>
                        <Card.Text>
                            {achievement.text}
                        </Card.Text>
                    </Col>
                </Row>
            </Card.Body>
            <Card.Footer style={{ textAlign: 'right' }}>
                <Row>
                    <Col style={{ textAlign: 'left' }}><StyledA target='_blank' href={achievement.link}>Перейти к событию</StyledA></Col>
                    <Col style={{ textAlign: 'right' }}>{achievement.date}</Col>
                </Row>
            </Card.Footer>
        </div>
    )
}

function AchievementBasic({ achievement , modalPhotoFunctions}) {

    return (
        <Card>
            <Achievement achievement={achievement} modalPhotoFunctions={ modalPhotoFunctions } />
        </Card>
    )
}

function AchievementStyled({ achievement, modalPhotoFunctions }) {

    return (
        <StyledCard>
            <Achievement achievement={achievement} modalPhotoFunctions={ modalPhotoFunctions } />
        </StyledCard>
    )
}

export default function Achievements() {

    const [achs, setAchs] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [photoPath, setPhotoPath] = useState(null)
    const [photoLabel, setPhotoLabel] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const modalPhotoFunctions = {
        setShowModal: setShowModal,
        setPhotoLabel: setPhotoLabel,
        setPhotoPath: setPhotoPath,
    }

    function handleClose() {
        setShowModal(false)
        setPhotoLabel(null)
        setPhotoPath(null)
    }

    useEffect(() => {
        getData({
        setData: setAchs,
        setIsLoading: setIsLoading,
        tableName: 'post'
        })
    }, [])

    if (isLoading) {
        return <Loading /> 
    }
    else {
        return (
            <Container className="my-4">
                <Row className="justify-content-center">
                    <Col lg={10}>
                        <AchievementStyled achievement={achs[0]} modalPhotoFunctions={ modalPhotoFunctions} />
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col lg={10}>
                        <StyledCarousel indicators controls className="mb-4">
                            {achs.slice(1).reverse().map((achievement, index) => (
                                <Carousel.Item key={index}>
                                    <AchievementBasic achievement={achievement} modalPhotoFunctions={ modalPhotoFunctions} />
                                </Carousel.Item>
                            ))}
                        </StyledCarousel>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col lg={10}>
                        {achs.slice(1).map((ach, index) => (
                            <div key={index}>
                                <AchievementStyled achievement={ach} modalPhotoFunctions={ modalPhotoFunctions} />
                            </div>
                        ))}
                    </Col>
                </Row>
                <ModalPhoto path={photoPath} label={photoLabel} show={showModal} handleClose={handleClose} />
            </Container>
        )
    }
}