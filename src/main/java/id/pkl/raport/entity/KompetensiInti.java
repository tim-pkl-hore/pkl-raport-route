package id.pkl.raport.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.validator.constraints.NotBlank;

@Entity
@Table(name="kompetensi_inti")
public class KompetensiInti {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="id")
	private Long id;
	
	@NotBlank
	@Column(name="description")
	private String description;
	
	@ManyToOne
	@JoinColumn(name="tahun_ajaran_id", referencedColumnName="id")
	private TahunAjaran tahunAjaran;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public TahunAjaran getTahunAjaran() {
		return tahunAjaran;
	}

	public void setTahunAjaran(TahunAjaran tahunAjaran) {
		this.tahunAjaran = tahunAjaran;
	}
	
	
}
