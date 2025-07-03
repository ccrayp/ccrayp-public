import { Card, Container, Row, Col } from "react-bootstrap"
import StyledCard from "../common/StyledCard"
import { useEffect, useState } from "react"
import Loading from "../common/Loading"
import { getData } from "../common/utilities"
import ModalPhoto from "../common/ModalPhoto"

const imgPrefix = 'https://raw.githubusercontent.com/ccrayp/ccrayp-api/refs/heads/main/assets/projects/'

function Project({ project, modalPhotoFunctions }) {

     const { setPhotoLabel, setPhotoPath, setShowModal } = modalPhotoFunctions;

    function openPhoto() {
        setPhotoLabel(project.label)
        setPhotoPath(imgPrefix + project.img)
        setShowModal(true)
    }

    return (
        <StyledCard>
            <Card.Header><a href={project.link} target="_blank" style={{textDecoration: 'none'}}>{project.label}</a></Card.Header>
            <Card.Body>
                <Card.Img onClick={openPhoto} src={imgPrefix + project.img} style={{ height: '300px', objectFit: 'contain', cursor: 'pointer'}} />
                <Card.Text className="mt-4">
                    {project.text}
                </Card.Text>
            </Card.Body>
            <Card.Footer style={{textAlign: 'right'}}>
                {project.stack}
            </Card.Footer>
        </StyledCard>
    )
}

export default function Projects() {

    const [projects, setProjects] = useState([])
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
        setData: setProjects,
        setIsLoading: setIsLoading,
        tableName: 'project'
        })
    }, [])

    if (isLoading) {
        return <Loading />
    }
    else {
        return (
            <Container className="my-4 d-flex justify-content-center">
                <Col lg={10} className="d-flex justify-content-center">
                    <Row className="justify-content-center" style={{ maxWidth: '100%', width: '100%' }}>
                        {projects.map((project, index) => (
                            <Col
                                key={index}
                                xs={12}
                                sm={6}
                                className="d-flex justify-content-center"
                            >
                                <Project key={index} project={project} modalPhotoFunctions={ modalPhotoFunctions } />
                            </Col>
                        ))}
                    </Row>
                </Col>
                <ModalPhoto path={photoPath} label={photoLabel} show={showModal} handleClose={handleClose} />
            </Container>
        )
    }
}