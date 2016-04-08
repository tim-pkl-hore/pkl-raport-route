package id.pkl.raport.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.validator.constraints.NotBlank;

@Entity
@Table(name="grup_kelas")
public class GrupKelas {
	@Id
	@GeneratedValue
	@Column(name="id")
	private Long id;
	
	@NotBlank
	@Column(name="grup_kelas", unique = true)
	private String grupKelas;
	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getGrupKelas() {
		return grupKelas;
	}

	public void setGrupKelas(String grupKelas) {
		this.grupKelas = grupKelas;
	}
}
