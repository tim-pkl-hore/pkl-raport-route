package id.pkl.raport.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.validator.constraints.NotBlank;

@Entity
@Table(name="jurusan")
public class Jurusan {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="id")
	private Long id;
	
	@NotBlank
	@Column(name="jurusan")
	private String jurusan;
	
	@NotBlank
	@Column(name="nama_jurusan")
	private String namaJurusan;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getJurusan() {
		return jurusan;
	}

	public void setJurusan(String jurusan) {
		this.jurusan = jurusan;
	}

	public String getNamaJurusan() {
		return namaJurusan;
	}

	public void setNamaJurusan(String namaJurusan) {
		this.namaJurusan = namaJurusan;
	}
	
	
}
